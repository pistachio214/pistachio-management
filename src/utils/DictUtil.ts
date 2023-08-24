import { OptionsInterface } from "@/types/common";

class DictUtil {

    static generateDictItem(options: OptionsInterface[], key: string | number): string {
        if (typeof key == 'number') {
            key = key + '';
        }

        for (let i = 0; i < options.length; i++) {
            if (options[i].value == key) { // eslint-disable-line
                return options[i].label;
            }
        }

        return '未知';
    }
}

export default DictUtil;