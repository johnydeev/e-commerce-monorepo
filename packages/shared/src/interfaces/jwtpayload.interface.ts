export interface jwtPayload {
    id: string; // El ID del cliente almacenado en el JWT
    name: string;
    email: string;
    role?: string;
}
