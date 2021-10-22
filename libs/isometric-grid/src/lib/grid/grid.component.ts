import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrameComponent } from '../frame.component';
import { GridManager } from '../grid-manager.service';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

@Component({
  selector: '[grid]',
  templateUrl: './grid.component.html'
})
export class GridComponent implements AfterViewInit {

  @Input() data: {x: number, y: number}[][];

  @ViewChild("xAxis") xAxis: ElementRef;
  @ViewChild("yAxis") yAxis: ElementRef;

  protected frame: FrameComponent;
  protected matrixes: Array<Array<object>> = [[]];

  frameSubscription: Subscription;
  x;
  y;

  constructor(
    public element: ElementRef,
    protected gridManager: GridManager
  ) {
    this.x = scaleLinear()
        .range([0, 20 * 10]);

    this.y = scaleLinear()
        .range([0, 20 * 10]);
    this.frameSubscription = gridManager.activeFrame$.subscribe(
      frame => {
        this.frame = frame;
      }
    );
  }

  ngAfterViewInit() {
    this.draw();
  }

  draw(): void {
    const container = select(this.frame.element.nativeElement).selectAll('g[class="container"]');
    this.drawTiles(container, 20, 11, 11);
    
    select(this.element.nativeElement)
      .attr('transform', this.gridManager.matrixAsSVG(this.gridManager.transformationMatrix))
    
    select(this.xAxis.nativeElement)
      .call(axisBottom(this.x));
    select(this.yAxis.nativeElement)
      .call(axisLeft(this.y));
  }

  drawTiles(container:any, cellSize:number, cellCountX:number, cellCountY:number):void {
    const tiles = container.append('g').attr('class', 'tiles');
    for (let x = 0; x < cellCountX; x++) {
      for (let y = 0; y < cellCountY; y++) {
        this.drawSquare([x * cellSize - 10, y * cellSize - 10], cellSize, tiles);
      }
    }
  }

  drawSquare(origin:Array<number>, cellSize:number, selection:any):void {
    const points = [
      [origin[0], origin[1]],
      [origin[0] + cellSize, origin[1]],
      [origin[0] + cellSize, origin[1] + cellSize],
      [origin[0], origin[1] + cellSize]
    ];
    const transformPoint = this.gridManager.transformPoint();
    selection.append('polygon')
      .attr('points', (d) => points.map(p => transformPoint(p)).join(' '))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 0.25);
  }
}
