import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FrameComponent } from './frame.component';
import { GridComponent } from './grid/grid.component';

@Injectable()
export class GridManager {
  protected gridCollection: Map<FrameComponent, GridComponent[]> = new Map<FrameComponent, GridComponent[]>();
  protected activeFrame = new Subject<FrameComponent>();
  
  activeFrame$ = this.activeFrame.asObservable();
  
  constructor() { }
  
  addGrid(grid: GridComponent, frame: FrameComponent): void {
    this.gridCollection.get(frame).push(grid);
  }
  
  activateFrame(frame: FrameComponent) {
    this.activeFrame.next(frame);
  }
  
  /** @see https://github.com/randallmorey/isometryjs */
  transformPoint() {
    return (coords) => {
      const product = this.matrixMultiply(this.transformationMatrix, [
        [coords[0]],
        [coords[1]],
        [1]
      ]);
      return [product[0][0], product[1][0]];
    };
  }
    
  /** @see https://github.com/randallmorey/isometryjs */
  matrixMultiply(matrix1, matrix2) {
    return matrix1.map(
      tuple1 => matrix2[0].map(
        (value, i) => matrix2.map(
          tuple => tuple[i]
        )
      )
      .map(
        tuple2 => tuple1.reduce(
          (accumulator, value, i) => (value * tuple2[i]) + accumulator, 0
        )
      )
    );
  }

  matrixAsSVG(matrix) {
    return 'matrix('+matrix[0][0]+' '+matrix[1][0]+' '+matrix[0][1]+' '+matrix[1][1]+' '+matrix[0][2]+' '+matrix[1][2]+')'
  }

  get transformationMatrix() {
    const rads = 30 * (Math.PI / 180);
    const matrices = {
      shear: [
        [1, Math.tan(-rads), 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      scale: [
        [1, 0, 0],
        [0, Math.cos(-rads), 0],
        [0, 0, 1]
      ],
      rotate: [
        [Math.cos(rads), -Math.sin(rads), 0],
        [Math.sin(rads), Math.cos(rads), 0],
        [0, 0, 1]
      ]
    };
    return this.matrixMultiply(
      matrices.rotate,
      this.matrixMultiply(matrices.shear, matrices.scale)
    );
  }
}