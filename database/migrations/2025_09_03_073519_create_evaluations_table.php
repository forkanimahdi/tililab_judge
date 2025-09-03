<?php

// database/migrations/2025_08_26_000001_create_evaluations_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained('condidates')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            // Scores
            $table->unsignedTinyInteger('motivation')->default(0);
            $table->unsignedTinyInteger('implication')->default(0);
            $table->unsignedTinyInteger('originalite')->default(0);
            $table->unsignedTinyInteger('communication')->default(0);

            // Decision: oui, non, discuter
            $table->enum('decision', ['oui', 'non', 'discuter'])->nullable();

            $table->timestamps();
        });

     
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
        Schema::table('condidates', function (Blueprint $table) {
        });
    }
};
