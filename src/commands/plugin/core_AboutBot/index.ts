import axios from 'axios';
import { Collection } from 'discord.js';

interface IMemoryUsage {
  [key: string]: any;
}

export default class AboutBotPlugin {
  constructor() { }

  public readonly getInfoPackageGithub = async (author: string, githubRepos: string): Promise<any> => {
    return new Promise((resolve, rejects) => {
      axios.get(`https://github.com/${author}/${githubRepos}/raw/master/package.json`)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          rejects(error)
        });
    })
  }

  public readonly linkGeneratorGithub = async (author: string, githubRepos: string, simplistic?: boolean): Promise<string> => {
    let ret: string = '';
    await this.getInfoPackageGithub(author, githubRepos)
      .then(res => {
        if (typeof simplistic === "boolean" && simplistic === true) {
          ret = `${res.name} (v.${res.version})`;
        }
        else {
          ret = `[${res.name} (v.${res.version})](https://github.com/${author}/${githubRepos})`;
        }
      })
      .catch(e => {
        ret = e;
      });
    return ret;
  }

  public readonly memoryUsage = (): string => {
    let used: IMemoryUsage = process.memoryUsage();
    let count: number = 0;
    let ret: string = '';

    for (let key in used) {
      if (count !== 0) ret += '\n';

      count++;
      ret += `${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`
    }

    return ret;
  }
}