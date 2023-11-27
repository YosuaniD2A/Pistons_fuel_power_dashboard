import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';

interface ProductVariant {
  color: string;
  size: string;
  SKU: string;
}

@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  providers: [MessageService],
  styleUrls: ['./digital-add.component.scss']
})


export class DigitalAddComponent implements OnInit {

  public Editor = ClassicEditor;

  productData: any = {};
  selectedProductType: string = '';
  selectedProductCollection: string = '';
  selectedProductDiscount: string = '';
  selectedProductCategory: string = '';
  onSale: string = 'true';

  tags: string[] | undefined;

  sizes: any[] = [];
  selectedSizes: string[] = [];
  selectAllSizes: boolean = false;

  colors: any[] = []
  selectedColor: any;

  tabFile: boolean = true;
  tabURL: boolean = false;
  list:number[] = [1];

  previewImage: { [key: number]: string } = {};
  files: File[] = [];


  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.sizes = [
      { name: 'S', code: '00S' }, 
      { name: 'M', code: '00M' }, 
      { name: 'L', code: '00L' }, 
      { name: 'XL', code: '0XL' }, 
      { name: 'XXL', code: '2XL' },
      { name: 'XXXL', code: '3XL' }
    ];

    this.colors = [
      { name: 'Black', code: 'B1', exa:'#000000', active: true },
      { name: 'White', code: 'W1', exa:'#ffffff', active: false },
      { name: 'Red', code: 'R1', exa:'#f60404', active: false },
      { name: 'Blue', code: 'A1', exa:'#1c04f6', active: false },
      { name: 'Navy', code: 'N1', exa:'#dcddc2', active: false },
      { name: 'Green', code: 'G1', exa:'#0ca03d', active: false },
    ]
  }
  
  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  toggleSizeSelection(size: string): void {
    if (this.selectedSizes.includes(size)) {
      this.selectedSizes = this.selectedSizes.filter((s) => s !== size);
    } else {
      this.selectedSizes.push(size);
    }

    this.updateIndividualSizes();
  }

  toggleAllSizes(): void {
    if (this.selectAllSizes) {
      this.selectedSizes = [];
    } else {
      this.selectedSizes = this.sizes.map(size => size.name);
    }
    this.updateIndividualSizes();
    
  }

  updateIndividualSizes(): void {
    this.selectAllSizes = this.selectedSizes.length === this.sizes.length;
  }

  selectColor(color: any): void {    
    if (color.active) {
      this.selectedColor = color;
    }
  }

  AddItem(){
    this.list.push(this.list[this.list.length-1] + 1);
  }

  RestItem(index: number): void {
    const deletedItem = this.list.splice(index, 1)[0];
  
    // Limpiar la vista previa correspondiente
    delete this.previewImage[deletedItem];
  }

  switchTab(tab: string): void {
    this.tabFile = false;
    this.tabURL = false;
    this.list = [1];
    this.previewImage = {};
    

    if (tab === 'tabFile') {
      this.tabFile = true;
    } else if (tab === 'tabURL') {
      this.tabURL = true;
    }
  }

  onFileChange(event: any, item: number): void {
    const file = event.target.files[0];
    
    if (file) {
      // Obtener la URL de la imagen para mostrar la vista previa
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage[item] = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Limpiar la vista previa si no se selecciona un archivo
      this.previewImage[item] = '';
    }
    
  }

  onTextChange(event: any, item: number): void {
    const url = event.target.value;
  
    if (url) {
      // Asignar la URL de la imagen para mostrar la vista previa
      this.previewImage[item] = url;
    } else {
      // Limpiar la vista previa si la URL está vacía
      this.previewImage[item] = '';
    }
  }

  generateProductVariants(color: any, sizesSelected: string[]): ProductVariant[] {
    const variants: ProductVariant[] = [];
  
    // Validar si sizesSelected tiene valores
  if (!sizesSelected || sizesSelected.length === 0) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, seleccione al menos una talla.' });
    return variants;
  }

  // Validar si color está definido
  if (!color) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, seleccione un color.' });
    return variants;
  }

    sizesSelected.forEach((elem) => {
      const size = this.sizes.find(item => item.name === elem);
      const SKU = `PFP000${color.code}${size.code}`;
      const variant: ProductVariant = {
        color: color.name,
        size: elem,
        SKU: SKU,
      };
      variants.push(variant);
    });
  
    return variants;
  }

  onSubmit() {
    this.productData.type = this.selectedProductType;
    this.productData.category = this.selectedProductCategory;
    this.productData.collection = this.selectedProductCollection;
    this.productData.descount = this.selectedProductDiscount;
    this.productData.onSale = this.onSale;
    this.productData.tags = this.tags;
    this.productData.variants = this.generateProductVariants(this.selectedColor, this.selectedSizes);
    this.productData.images = this.previewImage;

    const requiredProperties = ['title', 'type', 'category', 'collection', 'price', 'tags', 'variants'];
    const missingProperties = requiredProperties.filter(prop => !this.productData[prop] || this.productData[prop] === '' || this.productData[prop].length === 0);

    if (missingProperties.length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Por favor, complete los siguientes campos obligatorios: ${missingProperties.join(', ')}` });
      return;
    }

    this.messageService.add({ severity: 'success', summary: 'Producto registrado', detail: `Se registro el producto ${this.productData.title} con ${this.productData.variants.length} variantes` });
    console.log('Datos del formulario:', this.productData);
  }
}
