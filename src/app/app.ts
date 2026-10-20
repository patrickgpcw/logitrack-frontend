import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly connection = signal<'checking' | 'online' | 'offline'>('checking');

  constructor() {
    this.checkConnection();
  }

  protected checkConnection(): void {
    this.connection.set('checking');
    this.http
      .get<{ status: string }>('/api/health')
      .pipe(timeout(5000), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ status }) => this.connection.set(status === 'UP' ? 'online' : 'offline'),
        error: () => this.connection.set('offline'),
      });
  }
}
