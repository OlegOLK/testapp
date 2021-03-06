import { Model } from 'radiks';

export class BasicAction extends Model {
    static className = 'Action';
    static schema = {
        type: String,
        ruleId: {
            type: String,
            decrypted: true,
        },
        active: Boolean,
        userGroupId:{
            type: String,
            decrypted: true,
        }
    }
}


export class SendMailAction extends BasicAction {
    static className = 'SendMailAction';
    static schema = {
        text: String,
        recep: String,
        from: String
    }

    static defaults = {
        type: 'sendMailActon'
    }
}
