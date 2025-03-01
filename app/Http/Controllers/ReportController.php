<?php

namespace App\Http\Controllers;

use App\Models\report;
use App\Http\Requests\StorereportRequest;
use App\Http\Requests\UpdatereportRequest;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class ReportController extends Controller
{

    public function create(Request $request)
    {

        $url = $request->input("url");
        dd($url);
        $process = new Process([
            'lighthouse',
            $url,
            '--output=json',
            '--quiet',
            '--chrome-flags="--headless"'
        ]);

        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $report = json_decode($process->getOutput(), true);

        $visitor_friendly_messages = [
            "document-title" => "This website has a clear title, making it easier to recognize.",
            "html-has-lang" => "This site might not indicate its language properly, which could make it harder for screen readers to understand.",
            "color-contrast" => "Some text on this site might be hard to read, especially for people with vision difficulties.",
            "image-alt" => "Some images on this site may not have descriptions, making them inaccessible for visually impaired users.",
            "button-name" => "Some buttons might not be labeled clearly, which could make navigation harder for users relying on screen readers.",
            "link-name" => "Some links might not clearly explain where they lead, which can be confusing for visitors.",
            "video-caption" => "Some videos might not have captions, making them harder to understand for people with hearing impairments.",
            "bypass" => "This site might not have a way to skip repetitive content, which could make navigation difficult for some users.",
            "tabindex" => "Some interactive elements might not be accessible through keyboard navigation.",
            "target-size" => "Some buttons or links might be too small, making them difficult to tap on a touchscreen.",
            "meta-viewport" => "This site might not be mobile-friendly, which could make it harder to use on smaller screens.",
        ];

        $passed = [];
        $failed = [];

        foreach ($visitor_friendly_messages as $audit => $message) {
            if (isset($report['audits'][$audit])) {
                $audit_result = $report['audits'][$audit];

                $audit_data = [
                    'id' => $audit,
                    'message' => $message
                ];

                if (isset($audit_result['score']) && $audit_result['score'] === 1) {
                    $passed[] = $audit_data;
                } else {
                    $failed[] = $audit_data;
                }
            }
        }

        dd([
            'passed' => $passed,
            'failed' => $failed,
        ]);
    }
}
