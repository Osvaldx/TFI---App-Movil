import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class Auth {

  private supabase: SupabaseClient;
  // Creamos la "fuente" para poder establecer un estado: nos va a servir para saber si esta login o no
  private _user$ = new BehaviorSubject<User | null>(null);
  // Exponemos una variable que solo es el Observador para poder ver el estado y sin manera de editarlo
  user$ = this._user$.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.SUPABASE_API_URL,
      environment.SUPABASE_API_KEY,
    );

    //Vemos si existe en algun lado la sesion iniciada y la guardamos en _user$
    this.supabase.auth.getUser()
    .then(({ data }) => { // Desestructuramos data
      this._user$.next(data.user ?? null); // Guardamos user en la fuente si esq existe, sino null
    })

    //Si llega a cambiar la session hay que cambiar el estado
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._user$.next(session?.user ?? null);
    })
  }

  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    const resp = await this.supabase.auth.signInWithPassword({ email, password });

    if(resp.error) throw resp.error;

    this._user$.next(resp.data.user ?? null);
    return resp
  }

  async signOut() {
    const resp = await this.supabase.auth.signOut();
    this._user$.next(null);
    return resp
  }
}
