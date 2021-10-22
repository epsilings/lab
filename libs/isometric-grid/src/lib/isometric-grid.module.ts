import { NgModule } from '@angular/core';
import { FrameComponent } from './frame.component';
import { GridComponent } from './grid/grid.component';

/**
 * Isometric Grid Module
 */
@NgModule({
    declarations: [FrameComponent, GridComponent],
    imports: [],
    exports: [FrameComponent, GridComponent]
})
export class IsometricGridModule {

}
