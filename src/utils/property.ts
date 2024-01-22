import { Property } from '../typings/property';

/**
 * Sorts an array of properties based on their parent-child relationships.
 *
 * @param {Property[]} properties - An array of Property objects to be sorted.
 *
 * @returns {Property[]} - The sorted array of Property objects.
 */
export const getSortedProperties = (properties: Property[]): Property[] => {
  /**
   * Recursive function to sort properties based on parent-child relationships.
   *
   * @param {string|null} parentId - The ID of the parent property. If null, it indicates a root level.
   *
   * @returns {Property[]} - The sorted array of Property objects.
   */
  const sort = (parentId: string | null = null): Property[] => {
    return properties
      .filter((property: Property) => property.parent_id === parentId)
      .reduce((sorted: Property[], property: Property) => {
        return sorted.concat(property, sort(property.id));
      }, []);
  };

  // Start sorting from the root level (parentId = null)
  return sort(null);
};
