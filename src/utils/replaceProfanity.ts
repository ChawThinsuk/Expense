import { BadWordService } from "../services/badword.service";

const replaceProfanity = async  (comment: string): Promise<string> => {
    const badwordService: BadWordService = new BadWordService();
    const allBadWords = await badwordService.getAllBadWords();
    const badWordArr: string[] = allBadWords.results.split(/\s*,\s*|\s+/).map(word => word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());
    const words = comment.split(" ");
    const filteredWords = words.map(word => {
      if (badWordArr.includes(word.toLowerCase())) {
        return "***";
      }
      return word;
    });
    return filteredWords.join(" ");
}

export { replaceProfanity };
