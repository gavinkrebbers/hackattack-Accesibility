<?php

namespace App\Http\Controllers;

use App\Models\ReportContainer;
use App\Http\Requests\StoreReportContainerRequest;
use App\Http\Requests\UpdateReportContainerRequest;
use Inertia\Inertia;

class ReportContainerController extends Controller
{
    public function show(int $id)
    {
        $reportContainer = ReportContainer::with("reports")->findOrFail($id);
        return Inertia::render("ShowReport", ["reportContainer" => $reportContainer]);
    }
}
