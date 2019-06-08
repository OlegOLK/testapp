import { Model } from 'radiks';
import {DateTimeCondition} from './basicCondition';
import {SendMailAction} from './basicAction';

export class BasicRule extends Model {
    static className = 'Rule';
    static schema = {
        type: String,
        title: String,
        active: Boolean,
        userGroupId:{
            type: String,
            decrypted: true,
        },
        conditions: [],
        actions: [],
    }

    async afterFetch() {
        this.conditions = await DateTimeCondition.fetchList({
            ruleId: this._id,
        });
        this.actions = await SendMailAction.fetchList({
            ruleId: this._id,
        });
    }
}
