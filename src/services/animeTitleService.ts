import { axiosClassic } from "@/api/interceptors";
import type { ITitleChange, ITitleChangesParams } from "@/types/title-changes.type";
import type { ITitleListParams } from "@/types/title-list.type";
import type { ITitleRandomParams } from "@/types/title-random.type";
import type { ITitleSchedule, ITitleScheduleParams } from "@/types/title-schedule.type";
import type { ITitleUpdates, ITitleUpdatesParams } from "@/types/title-updates.type";
import type { IGetTitleParams, ITitle } from "@/types/title.type";

class AnimeTitleService {
  private BASE_URL = "/title";

  // Получить информацию о тайтле по id или коду
  // GET /v3/title
  public async getTitle(params: IGetTitleParams): Promise<ITitle> {
    const queryParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await axiosClassic.get<ITitle>(`/v3/${this.BASE_URL}?${queryParams}`);
    return response.data;
  }

  // Получить информацию о тайтле по id или коду
  // GET /v3/title/list
  public async getTitleList(params: ITitleListParams): Promise<ITitle[]> {
    const queryParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await axiosClassic.get<ITitle[]>(`/v3/${this.BASE_URL}/list?${queryParams}`);
    return response.data;
  }

  // Получить список последних обновлений тайтлов
  // GET /v3/title/updates
  public async getTitleUpdates(params: ITitleUpdatesParams): Promise<ITitleUpdates> {
    const queryParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await axiosClassic.get<ITitleUpdates>(`/v3/${this.BASE_URL}/updates?${queryParams}`);
    return response.data;
  }

  // Получить список последних изменений тайтлов
  // GET /v3/title/changes
  public async getTItleChanges(params: ITitleChangesParams): Promise<ITitleChange> {
    const queryParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await axiosClassic.get<ITitleChange>(`/v3/${this.BASE_URL}/changes?${queryParams}`);
    return response.data;
  }

  // Получить список последних обновлений тайтлов
  // GET /v3/title/schedule
  public async getTitleSchedule(params: ITitleScheduleParams): Promise<ITitleSchedule[]> {
    const queryParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await axiosClassic.get<ITitleSchedule[]>(`/v3/${this.BASE_URL}/schedule?${queryParams}`);
    return response.data;
  }

  // Возвращает случайный тайтл из базы
  // GET /v3/title/random
  public async getTitleRandom(params: ITitleRandomParams): Promise<ITitle[]> {
    const queryParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const response = await axiosClassic.get<ITitle[]>(`/v3/${this.BASE_URL}/random?${queryParams}`);
    return response.data;
  }
}

export const animeTitleService = new AnimeTitleService();
