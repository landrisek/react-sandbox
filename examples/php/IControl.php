<?php

namespace App\Components;

interface IControl {

    public function props(): array;

    public function handleState(): void;
}
