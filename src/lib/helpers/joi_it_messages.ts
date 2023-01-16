import type Joi from 'joi';

export const joiItMessages: Joi.LanguageMessages = {
	'alternatives.all': '{{#label}} does not match all of the required types',
	'alternatives.any': '{{#label}} does not match any of the allowed types',
	'alternatives.match': '{{#label}} does not match any of the allowed types',
	'alternatives.one': '{{#label}} matches more than one allowed type',
	'alternatives.types': '{{#label}} must be one of {{#types}}',
	'any.custom': '{{#label}} failed custom validation because {{#error.message}}',
	'any.default': '{{#label}} threw an error when running default method',
	'any.failover': '{{#label}} threw an error when running failover method',
	'any.invalid': '{{#label}} contiene un valore non valido',
	'any.only': '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
	'any.ref': '{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}',
	'any.required': '{{#label}} non può essere vuoto',
	'any.unknown': '{{#label}} è un valore non permesso',
	'array.base': '{{#label}} deve essere un valore multiplo',
	'array.excludes': '{{#label}} contains an excluded value',
	'array.hasKnown':
		'{{#label}} does not contain at least one required match for type {:#patternLabel}',
	'array.hasUnknown': '{{#label}} does not contain at least one required match',
	'array.includes': '{{#label}} does not match any of the allowed types',
	'array.includesRequiredBoth':
		'{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)',
	'array.includesRequiredKnowns': '{{#label}} does not contain {{#knownMisses}}',
	'array.includesRequiredUnknowns':
		'{{#label}} does not contain {{#unknownMisses}} required value(s)',
	'array.length': '{{#label}} must contain {{#limit}} items',
	'array.max': '{{#label}} must contain less than or equal to {{#limit}} items',
	'array.min': '{{#label}} must contain at least {{#limit}} items',
	'array.orderedLength': '{{#label}} must contain at most {{#limit}} items',
	'array.sort': '{{#label}} must be sorted in {#order} order by {{#by}}',
	'array.sort.mismatching': '{{#label}} cannot be sorted due to mismatching types',
	'array.sort.unsupported': '{{#label}} cannot be sorted due to unsupported type {#type}',
	'array.sparse': '{{#label}} must not be a sparse array item',
	'array.unique': '{{#label}} contains a duplicate value',
	'binary.base': '{{#label}} must be a buffer or a string',
	'binary.length': '{{#label}} must be {{#limit}} bytes',
	'binary.max': '{{#label}} must be less than or equal to {{#limit}} bytes',
	'binary.min': '{{#label}} must be at least {{#limit}} bytes',
	'boolean.base': '{{#label}} must be a boolean',
	'date.base': '{{#label}} must be a valid date',
	'date.format': '{{#label}} must be in {msg("date.format." + #format) || #format} format',
	'date.greater': '{{#label}} must be greater than {{:#limit}}',
	'date.less': '{{#label}} must be less than {{:#limit}}',
	'date.max': '{{#label}} must be less than or equal to {{:#limit}}',
	'date.min': '{{#label}} must be greater than or equal to {{:#limit}}',

	// Messages used in date.format

	'date.format.iso': 'ISO 8601 date',
	'date.format.javascript': 'timestamp or number of milliseconds',
	'date.format.unix': 'timestamp or number of seconds',
	'function.arity': '{{#label}} must have an arity of {{#n}}',
	'function.class': '{{#label}} must be a class',
	'function.maxArity': '{{#label}} must have an arity lesser or equal to {{#n}}',
	'function.minArity': '{{#label}} must have an arity greater or equal to {{#n}}',
	'object.and':
		'{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}',
	'object.assert':
		'{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}',
	'object.base': '{{#label}} must be of type {{#type}}',
	'object.instance': '{{#label}} must be an instance of {{:#type}}',
	'object.length': '{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}',
	'object.max':
		'{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}',
	'object.min': '{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}',
	'object.missing': '{{#label}} must contain at least one of {{#peersWithLabels}}',
	'object.nand': '{{:#mainWithLabel}} must not exist simultaneously with {{#peersWithLabels}}',
	'object.oxor':
		'{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}',
	'object.pattern.match': '{{#label}} keys failed to match pattern requirements',
	'object.refType': '{{#label}} must be a Joi reference',
	'object.regex': '{{#label}} must be a RegExp object',
	'object.rename.multiple':
		'{{#label}} cannot rename {{:#from}} because multiple renames are disabled and another key was already renamed to {{:#to}}',
	'object.rename.override':
		'{{#label}} cannot rename {{:#from}} because override is disabled and target {{:#to}} exists',
	'object.schema': '{{#label}} must be a Joi schema of {{#type}} type',
	'object.unknown': '{{#label}} is not allowed',
	'object.with': '{{:#mainWithLabel}} missing required peer {{:#peerWithLabel}}',
	'object.without': '{{:#mainWithLabel}} conflict with forbidden peer {{:#peerWithLabel}}',
	'object.xor': '{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}',
	'number.base': '{{#label}} deve essere un numero',
	'number.greater': '{{#label}} deve essere più grande di {{#limit}}',
	'number.infinity': '{{#label}} non può essere infinito',
	'number.integer': '{{#label}} deve essere un numero intero',
	'number.less': '{{#label}} deve essere più piccolo di {{#limit}}',
	'number.max': '{{#label}} deve essere più piccolo o uguale a {{#limit}}',
	'number.min': '{{#label}} deve essere più grande o uguale a {{#limit}}',
	'number.multiple': '{{#label}} deve essere un multiplo di {{#multiple}}',
	'number.negative': '{{#label}} deve essere un numero negativo',
	'number.port': '{{#label}} deve essere un numero di porta valido',
	'number.positive': '{{#label}} deve essere un numero positivo',
	'number.precision': '{{#label}} non deve avere più di {{#limit}} cifre decimali',
	'number.unsafe': '{{#label}} must be a safe number',
	'string.alphanum': '{{#label}} deve contenere solo caratteri alfanumerici',
	'string.base': '{{#label}} deve essere una stringa',
	'string.base64': '{{#label}} deve essere una stringa base64 valida',
	'string.creditCard': '{{#label}} deve essere una carta di credito valida',
	'string.dataUri': '{{#label}} deve essere una stringa dataUri valida',
	'string.domain': '{{#label}} deve contenere un nome di dominio valido',
	'string.email': '{{#label}} deve essere una email valida',
	'string.empty': '{{#label}} non può essere vuoto',
	'string.guid': '{{#label}} deve essere una GUID valida',
	'string.hex': '{{#label}} deve contenere solo caratteri esadecimali',
	'string.hexAlign': '{{#label}} hex decoded representation must be byte aligned',
	'string.hostname': '{{#label}} deve essere un hostname valido',
	'string.ip': '{{#label}} must be a valid ip address with a {{#cidr}} CIDR',
	'string.ipVersion':
		'{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR',
	'string.isoDate': '{{#label}} deve essere una data in formato iso',
	'string.isoDuration': '{{#label}} must be a valid ISO 8601 duration',
	'string.length': '{{#label}} la lunghezza deve essere di {{#limit}} caratteri',
	'string.lowercase': '{{#label}} must only contain lowercase characters',
	'string.max': '{{#label}} la lunghezza deve essere minore o uguale a {{#limit}} caratteri',
	'string.min': '{{#label}} la lunghezza deve essere almeno di {{#limit}} caratteri',
	'string.normalize': '{{#label}} must be unicode normalized in the {{#form}} form',
	'string.token': '{{#label}} must only contain alpha-numeric and underscore characters',
	'string.pattern.base':
		'{{#label}} Il valore {:[.]} non coincide con il pattern richiesto: {{#regex}}',
	'string.pattern.name': '{{#label}} with value {:[.]} fails to match the {{#name}} pattern',
	'string.pattern.invert.base':
		'{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}',
	'string.pattern.invert.name':
		'{{#label}} with value {:[.]} matches the inverted {{#name}} pattern',
	'string.trim': '{{#label}} must not have leading or trailing whitespace',
	'string.uri': '{{#label}} must be a valid uri',
	'string.uriCustomScheme':
		'{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern',
	'string.uriRelativeOnly': '{{#label}} must be a valid relative uri',
	'string.uppercase': '{{#label}} must only contain uppercase characters',
	'symbol.base': '{{#label}} must be a symbol',
	'symbol.map': '{{#label}} must be one of {{#map}}'
};