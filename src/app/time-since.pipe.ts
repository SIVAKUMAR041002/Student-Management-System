import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince',
  pure: false // Mark pipe as impure
})
export class TimeSincePipe implements PipeTransform {

  transform(lastUpdateTime: Date | null): string {
    if (!lastUpdateTime) return '';
    
    const now = new Date();
    const timeDiff = Math.floor((now.getTime() - new Date(lastUpdateTime).getTime()) / 1000); 

    const minutes = Math.floor(timeDiff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else {
      return `${minutes} minute(s) ago`;
    }
  }
}
