<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportContainerController;
use App\Http\Controllers\ReportController;
use App\Http\Middleware\AuthMiddleWare;
use App\Models\Report;
use App\Models\ReportContainer;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name("Home");

Route::middleware([AuthMiddleWare::class])->group(function () {


    Route::get('/report/{id}', [ReportController::class, 'show'])->name("report.show");
    Route::post('/create-report', [ReportController::class, 'create'])->name("report.create");
    Route::get('/profile', [ReportController::class, 'showUser'])->name("user.show");
    Route::delete('/report/delete/{id}', [ReportController::class, 'delete'])->name("report.delete");
    Route::post('/regenerate/{id}', [ReportController::class, 'update'])->name('report.update');
});
Route::delete('/container/{id}', [ReportContainerController::class, 'delete'])->name('container.delete');
Route::get('/reportcontainer/{id}', [ReportContainerController::class, 'show'])->name('container.show');
Route::post('/reportcontainer/add/{containerId}', [ReportController::class, 'addNew'])->name('report.new');

Route::get('/flashcards', function () {
    return Inertia::render("Flashcards");
})->name('flashcards');
Route::get('/info', function () {
    return Inertia::render("Info");
})->name("info");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


require __DIR__ . '/auth.php';
