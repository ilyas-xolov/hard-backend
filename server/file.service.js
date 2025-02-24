
import { v4 as uuidv4 } from 'uuid'; 
import { fileURLToPath } from 'url';
import color from 'colors';
import path from "path";
import fs from "fs";

class FileService {
    save(file){
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
    
            const fileName = uuidv4() + '.jpg';
            const currentDirname = __dirname;
            const staticDir = path.join(currentDirname,'..','static');
    
            if(!fs.existsSync(staticDir)){
                fs.mkdir(staticDir,{recursive});
            }

            file.mv(staticDir+fileName);

        } catch (error) {
            throw new Error(color.red("Error on save file"))
        }
    }
}


export default new FileService