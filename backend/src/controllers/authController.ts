import { Request, Response } from 'express';
import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';
import { users, User } from '../data/users';

const JWT_SECRET = 'dev-secret'; // store in env vars later

export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Email and password required.' });

    const userExists = users.find(u => u.email === email);
    if (userExists)
        return res.status(409).json({ message: 'User already exists.' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = { email, passwordHash };

    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: '1h'
    });

    res.status(200).json({ token });
};
