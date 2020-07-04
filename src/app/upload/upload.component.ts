import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JWKInterface } from 'arweave/web/lib/wallet';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public key: JWKInterface;

  public pinForm = this.fb.group({
    title: ['', Validators.required],
    tags: [''],
    url: [''],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  async handleKeyFile(files: FileList): Promise<void> {
    this.key = JSON.parse(await files.item(0).text());
  }
}
