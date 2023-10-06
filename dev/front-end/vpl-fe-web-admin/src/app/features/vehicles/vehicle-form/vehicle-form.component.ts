import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../brand/brand.service';
import { Brand } from '../../brand/models/brand';
import { VehicleType } from '../../model/enums/vehicle-type';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../vehicle.service';
import { CreateVehicle } from '../models/create-vehicle';
import { Model } from '../../model/models/model';
import { ModelService } from '../../model/model.service';
import { VehicleHubService } from '../vehicle-hub.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent {
  id?: number;

  form!: FormGroup;
  brands: Brand[] = [];
  models: Model[] = [];
  types: { value: number, text: string }[] = [];

  isLoading: boolean = true;

  selectedBrand?: Brand;
  selectedModel: Model | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: VehicleService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _brandService: BrandService,
    private _modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];

    this.createFrom();

    this.listTypes();

    let reqs = forkJoin({
      brands: this._brandService.list(),
    });

    if (this.id) {
      reqs = forkJoin({
        brands: this._brandService.list(),
        vehicle: this._service.find(this.id)
      });
    }

    reqs.subscribe({
      next: ({ brands, vehicle }: any) => {
        this.brands = brands;

        if (vehicle) {          
          this.form.patchValue(vehicle);
          
          this.selectedBrand = this.brands.find(x => x.id == vehicle.brandId);
        }

        this.isLoading = false;
      },
      error: (err: any) => {
        this._snackBar.open(err, 'Ok');

        this._router.navigate(['/vehicles']);
      }
    });
  }

  createFrom(): void {
    this.form = this._formBuilder.group({
      id: [0],
      brandId: [null, Validators.required],
      modelId: [null, Validators.required],
      name: ['', Validators.required],
      productionYear: ['', Validators.required],
      modelYear: ['', Validators.required],
      type: [null, Validators.required]
    });

    this.form.controls['brandId'].valueChanges.subscribe({
      next: (value?: any) => {
        if (value) {
          this.listModels(value);
        } else {
          this.models = [];
        }
      }
    });
  }

  listModels(brandId: number): void {
    this._modelService.listByBrandId(brandId).subscribe({
      next: (models: Model[]) => {
        this.models = models;
        this.selectedModel = models.find(x => x.id == this.form.controls['modelId'].value) ?? null;
      }
    });
  }

  listTypes(): void {
    this.types.push({ value: VehicleType.Car, text: this._service.getVehicleTypeDescription(VehicleType.Car) });
    this.types.push({ value: VehicleType.Moto, text: this._service.getVehicleTypeDescription(VehicleType.Moto) });
    this.types.push({ value: VehicleType.Bus, text: this._service.getVehicleTypeDescription(VehicleType.Bus) });
    this.types.push({ value: VehicleType.Truck, text: this._service.getVehicleTypeDescription(VehicleType.Truck) });
    this.types.push({ value: VehicleType.Van, text: this._service.getVehicleTypeDescription(VehicleType.Van) });
  }

  save(): void {
    if (this.canSubmit()) {
      this.isLoading = true;

      let vehicle: CreateVehicle = this.form.value;

      let req = !this.id ? this._service.create(vehicle) : this._service.update(this.id, vehicle);

      req.subscribe({
        next: _ => {
          this._router.navigate(['/vehicles']);
        },
        error: (err: any) => {
          this.isLoading = false;
        }
      });
    }
  }

  canSubmit(): boolean {
    return !this.isLoading && this.form.valid;
  }
}

