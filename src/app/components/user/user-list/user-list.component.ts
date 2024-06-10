import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../entities/user';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',

})
export class UserListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (data: IUser[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: number): void {
    if (confirm('Bạn có chắc muốn xóa người dùng này không?')) {
      this.authService.deleteUser(id).subscribe(
        () => {
          alert("Xóa thành công!")
          this.users = this.users.filter(user => user.id !== id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}