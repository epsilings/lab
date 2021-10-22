import { Component, Input, AfterContentInit, ElementRef } from '@angular/core';
import { zoom, D3ZoomEvent } from 'd3-zoom';
import { select } from 'd3-selection';
import { GridManager } from './grid-manager.service';

let nextId = 0;

@Component({
    selector: 'ngx-frame',
    templateUrl: './frame.component.html',
    providers: [
        GridManager
    ]
})
export class FrameComponent implements AfterContentInit {

    @Input() frameId = `ngx-frame-${nextId++}`;

    @Input() width: number = 200;
    @Input() height: number = 200;

    protected zoomListener;

    constructor(
        public element: ElementRef,
        protected gridManager: GridManager
    ) { }

    /** @internal */
    ngAfterContentInit(): void {
        this.gridManager.activateFrame(this);

        this.zoomListener = zoom().on("zoom", this.onZoom.bind(this));
        select(this.element.nativeElement)
            .call(this.zoomListener);
    }

    onZoom(event: D3ZoomEvent<HTMLCanvasElement, any>): void {
        select(this.element.nativeElement)
            .selectAll('g[class=container]')
            .attr('transform', 'translate(' + event.transform.x + ', ' + event.transform.y + ') scale(' + event.transform.k + ')');
    }
}
