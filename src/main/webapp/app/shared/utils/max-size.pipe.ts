import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'maxSize'
})
export class MaxSizePipe implements PipeTransform {

    transform(value: any, size: number): any {
        const v: string = value;
        return v.substr(0, size) + "...";
    }

}
