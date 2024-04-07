import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ItemManagerService } from './services/item-manager.service';

@Component({
  selector: 'app-item-manager',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ItemManagerService],
  templateUrl: './Item-manager.component.html',
  styleUrl: './Item-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemManagerComponent implements OnInit {
  constructor(private itemManagerService: ItemManagerService) {}
  async ngOnInit(): Promise<void> {
    const data = this.itemManagerService.getData().subscribe((data) => {
      console.log(data);
      return data;
    });
    // console.log(data);
  }
}
