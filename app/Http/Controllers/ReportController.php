<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportContainer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

use function PHPUnit\Framework\returnSelf;

class ReportController extends Controller
{
    public function addNew(int $containerId)
    {
        $reportContainer = ReportContainer::findOrFail($containerId);
        $url = $reportContainer->url;
        $reportData = $this->generateReport($url);
        $user = Auth::user();
        $newReport = $reportContainer->reports()->create([
            'url' => $url,
            'report' => json_encode([
                'passed' => $reportData["passed"],
                'failed' => $reportData["failed"],
                'not_applicable' => $reportData["notApplicable"]
            ]),
            'score' => $reportData["score"],
            'user_id' => $user->id,
        ]);
        return redirect()->route('container.show', ['id' => $containerId]);
    }

    public function update(int $id)
    {
        $report = Report::findOrFail($id);
        $url = $report->url;
        $reportData = $this->generateReport($url);
        $report->report = json_encode([
            'passed' => $reportData["passed"],
            'failed' => $reportData["failed"],
            'not_applicable' => $reportData["notApplicable"]
        ]);
        $report->score = $reportData["score"];
        $report->save();

        return redirect()->route("report.show", ["id" => $report->id]);
    }

    public function showUser()
    {
        // $user = Auth::user()->load('reports');
        $user = Auth::user()->load('reportContainers.reports');

        return Inertia::render("ShowUser", ["auth" => $user]);
    }

    public function show(int $id)
    {
        $report = Report::findOrFail($id);
        return Inertia::render("ShowReport", ["report" => $report]);
    }


    public function delete(int $id)
    {
        $report = Report::findOrFail($id);

        $report->delete();
        return redirect()->route("user.show");
    }

    public function create(Request $request)
    {
        $request->validate([
            'url' => 'required|url'
        ]);

        $url = $request->input("url");
        $user = Auth::user();

        try {
            $reportData = $this->generateReport($url);

            // Check for Lighthouse execution errors
            if (isset($reportData['error'])) {
                throw new \RuntimeException($reportData['error']);
            }

            $reportContainer = $user->reportContainers()->create([
                "url" => $url
            ]);

            $reportContainer->reports()->create([
                'url' => $url,
                'report' => json_encode([
                    'passed' => $reportData["passed"],
                    'failed' => $reportData["failed"],
                    'not_applicable' => $reportData["notApplicable"]
                ]),
                'score' => $reportData["score"],
                'user_id' => $user->id,
            ]);

            return redirect()->route('container.show', ['id' => $reportContainer->id]);
        } catch (\Exception $e) {
            Log::error("Lighthouse report failed for $url: " . $e->getMessage());
            return redirect()->back()
                ->withInput()
                ->withErrors(['lighthouse' => 'Failed to generate report. Please try again.']);
        }
    }

    private function generateReport(string $url): array
    {
        set_time_limit(300);

        try {
            $process = new Process([
                'lighthouse',
                $url,
                '--output=json',
                '--quiet',
                '--only-categories=accessibility',
                '--chrome-flags="--headless --no-sandbox"'
            ]);

            $process->run();

            // Debug logging
            Log::debug("Lighthouse command: " . $process->getCommandLine());
            Log::debug("Lighthouse output: " . $process->getOutput());
            Log::debug("Lighthouse errors: " . $process->getErrorOutput());

            if (!$process->isSuccessful()) {
                throw new \RuntimeException($process->getErrorOutput());
            }

            $reportData = json_decode($process->getOutput(), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \RuntimeException('Invalid JSON output from Lighthouse');
            }

            // Parse report data
            $passed = [];
            $failed = [];
            $notApplicable = [];

            foreach ($reportData['audits'] as $audit => $auditResult) {
                $audit_data = [
                    'id' => $audit,
                    'title' => $auditResult['title'] ?? '',
                    'description' => $auditResult['description'] ?? '',
                    'score' => $auditResult['score'] ?? null,
                ];

                if (($auditResult['score'] ?? null) === 1) {
                    $passed[] = $audit_data;
                } elseif (($auditResult['score'] ?? null) === 0) {
                    $snippets = [];
                    $explanation = null;

                    if (isset($auditResult['details']['items'])) {
                        foreach ($auditResult['details']['items'] as $item) {
                            if (isset($item['node']['snippet'])) {
                                $snippets[] = ['code_snippet' => $item['node']['snippet']];
                            }
                            if (isset($item['node']['explanation']) && $explanation === null) {
                                $explanation = $item['node']['explanation'];
                            }
                        }
                    }

                    $failed[] = array_merge($audit_data, [
                        'issues' => [
                            'snippets' => $snippets,
                            'explanation' => $explanation,
                        ],
                    ]);
                } else {
                    $notApplicable[] = $audit_data;
                }
            }

            $score = $reportData['categories']['accessibility']['score'] * 100;

            return [
                "passed" => $passed,
                "failed" => $failed,
                "notApplicable" => $notApplicable,
                "score" => $score
            ];
        } catch (\Exception $e) {
            Log::error("Lighthouse error: " . $e->getMessage());
            return [
                "passed" => [],
                "failed" => [],
                "notApplicable" => [],
                "score" => 0,
                "error" => $e->getMessage()
            ];
        }
    }
}
