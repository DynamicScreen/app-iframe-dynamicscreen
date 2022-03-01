<?php

namespace DynamicScreen\Iframe\Iframe;

use DynamicScreen\SdkPhp\Handlers\SlideHandler;
use DynamicScreen\SdkPhp\Interfaces\ISlide;
use Illuminate\Support\Arr;

class IframeHandler extends SlideHandler
{

    public function fetch(ISlide $slide): void
    {
        $this->addSlide([
            'url' => $slide->getOption('url', ''),
            'refresh_content' => $slide->getOption('refresh_content', 'false')
        ]);
    }
}