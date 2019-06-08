import React from 'reactn';
import { GroupInvitation } from 'radiks';
import { RulesList } from './vault.rulesList';

async function processInvitations() {
    const invitations = await fetch("https://localhost:44322/api/reciever");
    const res = await invitations.json();
    await activateInvitations(res);

}

function clearProcessedData(invitations) {
    if(!invitations || invitations.length <= 0){
        return;
    }

    const items = [];
    invitations.map(id => items.push({
        InvitationId: id
    }));

    fetch('https://localhost:44322/api/reciever/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(items)
    })
}

async function activateInvitations(invitations) {
    try {

        for (let i = 0; i < invitations.length; i++) {
            const invitation = await GroupInvitation.findById(invitations[i]);
            if (invitation) {
                try {
                    await invitation.activate();
                } catch (e) {
                    console.log('Error', e);
                } finally {

                }
            }
        }
    } finally {
        clearProcessedData(invitations);
    }

}

export default class ServerMode extends React.Component {

    async  componentDidMount() {
        try {
            setInterval(async () => {
                await processInvitations();
            }, 30000);


            // setInterval(async()=>{
            //     await processRules();
            // }, 3000);
        } catch (e) {
            console.log('Error', e);
        }

    }

    render() {
        return (
            <div>
                <RulesList />
            </div>
        )
    }
}