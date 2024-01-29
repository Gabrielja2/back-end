export type JsonWebTokenType = {
	[key: string]: unknown;
	iss?: string
	sub?: string
	aud?: string | string[]
	exp?: number
	nbf?: number
	iat?: number
	jti?: string
}