const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const slugify = require('slugify')

class Helper {
    GetResponse(res, statusCode = 0, message = '', data = null) {
        return res.status(statusCode).json({ code: statusCode, message: message, data: data})
    }
    HashPassword(passwordString) {
        const genSalt = bcrypt.genSaltSync(12)
        return bcrypt.hashSync(passwordString,genSalt)
    }
    CheckPassword(passwordString, userPassword) {
        return bcrypt.compareSync(passwordString, userPassword)
    }
    GenerateUUID() {
        const uuid = uuidv4()
        const uuidWithoutHyphens = uuid.replace(/-/g, '')
        return uuidWithoutHyphens
    }
    getTanggalIndonesia() {
        const formatter = new Intl.DateTimeFormat('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const parts = formatter.formatToParts(new Date());
        const tahun = parts.find(p => p.type === 'year').value;
        const bulan = parts.find(p => p.type === 'month').value;
        const tanggal = parts.find(p => p.type === 'day').value;

        return `${tahun}${bulan}${tanggal}`;
    }
    GenerateCode(codeType) {
        let formattedCode = null
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        const formattedDate = this.getTanggalIndonesia()
        switch(codeType) {
            case 'room-code':
                formattedCode = `RC-${formattedDate}-${randomNumber}`
                break
            case 'transaction-code':
                formattedCode = `TC-${formattedDate}-${randomNumber}`
                break
            default:
                break
        }
        return formattedCode
    }
    GenerateSlug(str) {
        const slugStr = slugify(str, {
            lower: true,
            strict: false
        })
        return slugStr
    }
}

module.exports = new Helper()