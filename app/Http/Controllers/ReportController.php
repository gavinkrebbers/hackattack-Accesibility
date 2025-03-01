<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

use function PHPUnit\Framework\returnSelf;

class ReportController extends Controller
{

    public function showUser()
    {
        $user = Auth::user()->load('reports');
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
            throw new ProcessFailedException($process);
        }

        $report = json_decode($process->getOutput(), true);

        $accessibility_tests = [
            "document-title" => [
                "description" => "Ensures that the page has a clear and descriptive title. This helps screen reader users quickly identify the content of the page.",
            ],
            "html-has-lang" => [
                "description" => "Checks if the HTML document has a `lang` attribute specifying the language of the content. This helps screen readers pronounce text correctly.",
            ],
            "color-contrast" => [
                "description" => "Ensures there is sufficient contrast between text and background colors. Poor contrast makes text hard to read for users with low vision or color blindness.",
            ],
            "image-alt" => [
                "description" => "Verifies that images have descriptive alt text. Alt text allows screen reader users to understand what the image conveys.",
            ],
            "button-name" => [
                "description" => "Ensures buttons have clear, descriptive names that convey their function. This is crucial for screen reader users.",
            ],
            "link-name" => [
                "description" => "Checks if links are properly labeled with descriptive text. Links that are not clearly labeled can confuse screen reader users.",
            ],
            "video-caption" => [
                "description" => "Ensures videos have captions for users who are deaf or hard of hearing. Captions provide access to spoken content.",
            ],
            "bypass" => [
                "description" => "Checks whether the website offers a mechanism to skip repetitive content. This is important for screen reader or keyboard users.",
            ],
            "tabindex" => [
                "description" => "Ensures that all interactive elements (like buttons, links, and form fields) are reachable using the keyboard's `Tab` key.",
            ],
            "target-size" => [
                "description" => "Ensures that clickable elements are large enough to be easily interacted with, particularly for users with limited dexterity.",
            ],
            "meta-viewport" => [
                "description" => "Checks if the page is mobile-friendly by ensuring the `meta-viewport` tag is used.",
            ],
            "accesskeys" => [
                "description" => "Ensures that interactive elements are accessible via keyboard shortcuts, making it easier for users with motor impairments.",
            ],
            "form-field-multiple-labels" => [
                "description" => "Checks that form fields are associated with a single, clear label. Multiple or missing labels can cause confusion for screen reader users.",
            ],
            "heading-order" => [
                "description" => "Ensures that headings are used in a logical order. This is important for screen reader users to understand the structure of the content.",
            ],
            "landmark-one-main" => [
                "description" => "Checks if the page contains a `<main>` landmark, which identifies the primary content area. This helps screen reader users quickly jump to the main content.",
            ],
            "landmarks" => [
                "description" => "Ensures that the page uses landmarks such as `<header>`, `<nav>`, `<main>`, and `<footer>`. This allows screen readers to navigate between key sections.",
            ],
            "logical-tab-order" => [
                "description" => "Verifies that the tab order follows a logical sequence. This is essential for users who rely on keyboard navigation.",
            ],
            "no-autofill" => [
                "description" => "Ensures that the page does not interfere with autofill functionality, which can cause problems for users with cognitive or motor disabilities.",
            ],
            "interactive-content" => [
                "description" => "Checks that all interactive content is accessible, meaning buttons, links, and forms should be properly labeled and navigable.",
            ],
            "region" => [
                "description" => "Ensures that important content regions are clearly identified using ARIA regions or landmarks, which helps screen readers navigate the page quickly.",
            ]
        ];

        $passed = [];
        $failed = [];

        foreach ($accessibility_tests as $audit => $test) {
            if (isset($report['audits'][$audit])) {
                $audit_result = $report['audits'][$audit];

                $audit_data = [
                    'id' => $audit,
                    'description' => $test['description'],
                ];

                if (isset($audit_result['score']) && $audit_result['score'] === 1) {
                    $passed[] = $audit_data;
                } else {
                    $failed[] = $audit_data;
                }
            }
        }

        $user = Auth::user();
        $report = $user->reports()->create([
            'url' => $url,
            'passed' => json_encode($passed),
            'failed' => json_encode($failed),
        ]);
        return redirect()->route("report.show", ["id" => $report->id]);
    }

    public function delete(int $id)
    {
        $report = Report::findOrFail($id);

        $report->delete();
        return redirect()->route("user.show");
    }
}
