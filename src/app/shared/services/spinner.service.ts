import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpinner } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  loadingByUrl$: BehaviorSubject<ISpinner[]> = new BehaviorSubject<ISpinner[]>([]);
  requests: ISpinner[] = [];
  /**
   * contains in-progress loading requests
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  /**
   * Sets the loading$ property value based on the following:
   * - If loading is true, add the provided url to the loadingMap with a true value, set loading$ value to true
   * - If loading is false, remove the loadingMap entry and only when the map is empty will we set loading$ to false
   * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
   * other requests have completed.
   * @param loading {boolean}
   * @param url {string}
   */

  setLoadingByUrl(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading) {
      this.loadingMap.set(url, loading);
      this.requests.push({ isLoading: loading, url });
      this.loadingByUrl$.next(this.requests);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
      this.requests = this.requests.filter(req => url !== req.url);
      this.loadingByUrl$.next(this.requests);
    }
    console.log('this.loadingMap :>> ', this.loadingMap);
    console.log('this.requests :>> ', this.requests);
    if (this.loadingMap.size === 0) {
      this.loadingByUrl$.next([]);
    }
  }
}
