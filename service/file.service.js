
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
            const fileUrl = path.join(staticDir,fileName);
            if(!fs.existsSync(staticDir)){
                fs.mkdirSync(staticDir,{recursive: true});
            }
            
            file.mv(fileUrl);

            return fileName
        } catch (error) {
            throw new Error(color.red("Error on save file: ") + error)
        }
    }
}


export default new FileService