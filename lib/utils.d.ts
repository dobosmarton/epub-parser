export interface TraverseNestedObject {
    preFilter?: (node: any) => boolean;
    postFilter?: (node: any) => boolean;
    transformer?: (node: any, children: any) => any;
    finalTransformer?: (node: any) => any;
    childrenKey: string;
}
/**
 * traverseNestedObject
 * a note about config.transformer
 * `children` is a recursively transformed object and should be returned for transformer to take effect
 * objects without `children` will be transformed by finalTransformer
 * @param _rootObject
 * @param config
 */
export declare const traverseNestedObject: (_rootObject: Object | Object[], config: TraverseNestedObject) => any[];
