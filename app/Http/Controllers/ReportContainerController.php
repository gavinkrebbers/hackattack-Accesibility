<?php

namespace App\Http\Controllers;

use App\Models\ReportContainer;
use App\Http\Requests\StoreReportContainerRequest;
use App\Http\Requests\UpdateReportContainerRequest;
use Inertia\Inertia;

class ReportContainerController extends Controller
{

    public function delete(int $id)
    {
        $reportContainer = ReportContainer::findOrFail($id);
        $reportContainer->delete();
        return redirect()->route("user.show");
    }

    public function show(int $id)
    {
        $reportContainer = ReportContainer::with("reports")->findOrFail($id);
        return Inertia::render("ShowReport", ["reportContainer" => $reportContainer]);
    }
}
