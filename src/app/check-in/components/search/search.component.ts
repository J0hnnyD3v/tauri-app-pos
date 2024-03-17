import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { primengModules } from '@src/primeng-modules';

@Component({
  selector: 'check-in-search',
  standalone: true,
  imports: [ReactiveFormsModule, ...primengModules],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private _fb = inject(FormBuilder);

  fg: FormGroup = this._fb.group({
    searchText: [''],
  });

  onSubmit() {}
}
