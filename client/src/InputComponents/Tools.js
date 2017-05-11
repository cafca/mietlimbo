// Props as supplied to assistant form input components
export type AssistantInputProps = {
	changed: (string, string) => mixed, 
	valid: (string, boolean) => mixed
};