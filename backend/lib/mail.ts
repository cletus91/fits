import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

function makeANiceEmail(text: string) {
	return `
        <div style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-heighht: 2;
            font-size: 20px;        
        ">
            
        <h2>Hello there!</h2>
            <p>${text}</p>
            <p>❤, Cletus Dias</p>
            
        </div>
    `;
}

export interface MailResponse {
	accepted: string[];
	rejected: any[];
	envelopeTime: number;
	messageTime: number;
	messageSize: number;
	response: string;
	envelope: Envelope;
	messageId: string;
}

export interface Envelope {
	from: string;
	to: string[];
}

export async function passwordResetEmail(
	resetToken: string,
	to: string
): Promise<void> {
	const info = (await transporter.sendMail({
		to,
		from: 'cletus@example.com',
		subject: 'Here is your password reset token!',
		html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
	})) as MailResponse;
	console.log(info);
	if (process.env.MAIL_USER.includes('ethereal.email')) {
		console.log(`📩 Message Sent! Preview at ${getTestMessageUrl(info)}`);
	}
}
