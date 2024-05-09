import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users: User[];
  filteredUsers: User[];
  searchControl: FormControl;
  userService = inject(UserService);

  constructor() {
    this.users = [];
    this.filteredUsers = [];
    this.searchControl = new FormControl();
  }

  public ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(({ users }) => {
        this.users = users;
        this.filteredUsers = users;
      });

    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        startWith('')
      ).subscribe((value: string) => {
        this.filteredUsers = this.users.filter((user: User): boolean => {
          return user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.maidenName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase());
        });
      })

  }

}
