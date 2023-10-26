import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Injectable({
  providedIn: 'root',
})
export class CambiosGuard implements CanDeactivate<unknown> {
  dialogOpen?: boolean = false;
  constructor(public dialog: MatDialog, private route: Router) {}

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const formGroupValues = component.userForm.value;
    console.log(formGroupValues);
    const hasChanges =
      formGroupValues.nombre ||
      formGroupValues.apellido ||
      formGroupValues.edad;

    if (hasChanges && !this.dialogOpen) {
      this.dialogOpen = true;
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Quiere cerrar? Todavía no ha subido la encuesta!',
      });

      return dialogRef.afterClosed().pipe(
        map((result) => {
          this.dialogOpen = false;
          if (result) {
            formGroupValues.nombre = null;
            formGroupValues.apellido = null;
            formGroupValues.edad = null;
            this.route.navigate(['/home']);
            return true;
          } else {
            return false;
          }
        })
      );
    }

    return true;
  }
}
