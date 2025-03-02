<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportContainer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function create(Request $request)
    {
        $url = $request->input("url");
        $user = Auth::user();

        $reportContainer = $user->reportContainers()->create([
            "url" => $url
        ]);

        $reportData = $this->generateReport($url);

        $report = $reportContainer->reports()->create([
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

        // return redirect()->route("report.show", ["id" => $report->id]);
    }


    public function delete(int $id)
    {
        $report = Report::findOrFail($id);

        $report->delete();
        return redirect()->route("user.show");
    }


    private function generateReport(string $url)
    {
        set_time_limit(300);
        $process = new Process([
            'lighthouse',
            $url,
            '--output=json',
            '--quiet',
            '--only-categories=accessibility',
            '--chrome-flags="--headless"'
        ]);

        $process->run();

        if (!$process->isSuccessful()) {
            return response()->json(['error' => 'Lighthouse failed: ' . $process->getErrorOutput()], 500);
        }

        $reportData = json_decode($process->getOutput(), true);

        $passed = [];
        $failed = [];
        $notApplicable = [];

        foreach ($reportData['audits'] as $audit => $auditResult) {
            $audit_data = [
                'id' => $audit,
                'title' => $auditResult['title'],
                'description' => $auditResult['description'],
                'score' => $auditResult['score'],
            ];

            if ($auditResult['score'] === 1) {
                $passed[] = $audit_data;
            } elseif ($auditResult['score'] === 0) {
                $snippets = [];
                $explanation = null;

                if (isset($auditResult['details']['items'])) {
                    foreach ($auditResult['details']['items'] as $item) {
                        if (isset($item['node']['snippet'])) {
                            $snippets[] = [
                                'code_snippet' => $item['node']['snippet'],
                            ];
                        }
                        if (isset($item['node']['explanation']) && $explanation === null) {
                            $explanation = $item['node']['explanation'];
                        }

                        if (isset($item['subItems']) && isset($item['subItems']['items'])) {
                            foreach ($item['subItems']['items'] as $subItem) {
                                if (isset($subItem['relatedNode']['snippet'])) {
                                    $snippets[] = [
                                        'code_snippet' => $subItem['relatedNode']['snippet'],
                                    ];
                                }
                            }
                        }
                    }
                }

                if (!empty($snippets)) {
                    $failed[] = [
                        'id' => $audit,
                        'title' => $auditResult['title'],
                        'description' => $auditResult['description'],
                        'score' => $auditResult['score'],
                        'issues' => [
                            'snippets' => $snippets,
                            'explanation' => $explanation,
                        ],
                    ];
                }
            } else {
                $notApplicable[] = $audit_data;
            }
        }

        $score = $reportData['categories']['accessibility']['score'] * 100;

        return ["passed" => $passed, "failed" => $failed, "notApplicable" => $notApplicable, "score" => $score];
    }
}
