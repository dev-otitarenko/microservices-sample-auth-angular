import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {LoaderService} from "../../_services/loader.service";
import {LoaderState} from "../../_utils/ui-utils";

@Component({
	selector: 'app-loader',
	templateUrl: 'loader.component.html',
	styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
	show:boolean;
	private subscription: Subscription;

	constructor(private loaderService: LoaderService) {
    this.show = false;
  }

	ngOnInit() {
		this.subscription = this.loaderService.loaderState
				.subscribe((state: LoaderState) => {
					this.show = state.show;
				});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
