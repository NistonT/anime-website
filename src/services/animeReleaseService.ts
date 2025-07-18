import { axiosClassic } from "@/api/interceptors";
import type { IReleaseIdOrAlias } from "@/types/release-idOrAlias.type";
import type { IErrorReleaseLatest, IReleaseLatest } from "@/types/release-latest.type";
import type { IErrorReleaseList, IReleaseList, IRequestReleaseList } from "@/types/release-list.type";
import type { IReleaseRandom } from "@/types/release-random";
import type { AxiosResponse } from "axios";

export class AnimeReleaseService {
  private BASE_URL = "/releases";

  // Возвращает данные по последним релизам
  public async getReleaseLatest(limit: number): Promise<AxiosResponse<IReleaseLatest[] | IErrorReleaseLatest>> {
    const response = await axiosClassic.get<IReleaseLatest[] | IErrorReleaseLatest>(`${this.BASE_URL}/latest?limit=${limit}`);
    return response;
  }

  // Возвращает данные по случайным релизам
  public async getReleaseRandom(limit: number): Promise<AxiosResponse<IReleaseRandom[]>> {
    const response = await axiosClassic.get<IReleaseRandom[]>(`${this.BASE_URL}/random?limit=${limit}`);
    return response;
  }

  // Возвращает данные по списку релизов
  public async getReleaseList(data: IRequestReleaseList): Promise<AxiosResponse<IReleaseList | IErrorReleaseList>> {
    const params = new URLSearchParams();

    if (data.limit) params.append("limit", data.limit.toString());
    if (data.page) params.append("page", data.page.toString());

    if (data.aliases?.length) {
      data.aliases.forEach((alias) => params.append("aliases", alias));
    }

    if (data.ids?.length) {
      data.ids.forEach((id) => params.append("ids", id.toString()));
    }

    const response = await axiosClassic.get<IReleaseList | IErrorReleaseList>(`${this.BASE_URL}/list`, { params });
    return response;
  }

  // Возвращает данные по релизу
  public async getReleaseIdOrAlias(path: string): Promise<AxiosResponse<IReleaseIdOrAlias>> {
    const response = await axiosClassic.get<IReleaseIdOrAlias>(`${this.BASE_URL}/${path}`);
    return response;
  }
}

export const animeReleaseService = new AnimeReleaseService();
