import Joi, { ValidationResult } from 'joi';
import ILanding from '../models/web/landing';

const SchemaLanding = Joi.object({
  path: Joi.string().required(),
  title: Joi.string().required(),
  blocks: Joi.array(),
});

class ValidatorService {
  /**
   * Validate the current body by the schema
   * @param data ILanding
   * @return string | null
   */
  public landing(data: ILanding) {
    const { error }: ValidationResult = SchemaLanding.validate(data);
    if (error) {
      return error.message;
    }
    return null;
  }
}

export default new ValidatorService();
