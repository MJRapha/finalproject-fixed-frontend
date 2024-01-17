export type IsActiveProps = {
    isActive: boolean
}

export type AuthContextType = {
    isLoggedIn: boolean;
    username?: string;
    email?: string;
    token?: string;
    role?: string;
    login: (username: string, email: string, token: string, role: string) => void;
    logout: () => void;
};

export type ChildProps = {
    children?: React.ReactNode;
};

export type RegisterFormType = {
    username: string;
    email: string;
    password: string;
};

export type LoginFormType = {
    email: string;
    password: string;
};

export interface ICard {
    nameOfMeme: string;
    description: string,
    image: string;
}