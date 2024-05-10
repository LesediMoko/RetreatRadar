import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  standalone: true,
  name: 'FirestoreTimestamp',
})
export class FSTimestampPipe implements PipeTransform {
  transform(fsSeconds: number = 0, fsNanoseconds = 0): number {
    return fsSeconds * 1000 + fsNanoseconds / 1000000;
  }
}
