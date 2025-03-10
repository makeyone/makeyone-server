import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class FileGenerator {
  constructor() {}

  async generateInitialProfileImage(nickname: string): Promise<Buffer> {
    const initials = this.getInitials(nickname);
    const backgroundColor = this.getRandomColor();

    return await sharp({
      create: {
        width: 200,
        height: 200,
        channels: 4,
        background: backgroundColor,
      },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="200" height="200">
              <rect width="100%" height="100%" fill="${backgroundColor}"/>
              <text x="50%" y="50%" font-size="70" font-weight="bold" fill="white" text-anchor="middle" dy=".3em">${initials}</text>
            </svg>`,
          ),
          top: 0,
          left: 0,
        },
      ])
      .toFormat('webp')
      .toBuffer();
  }

  private getInitials(nickname: string): string {
    if (!nickname) return '??';
    const words = nickname.split(' ').filter(Boolean);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  private getRandomColor(): string {
    const colors = ['#FF5733', '#33B5E5', '#8E44AD', '#2ECC71', '#FFC107', '#E91E63', '#FF9800'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
