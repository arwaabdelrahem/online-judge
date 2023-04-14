import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { BaseRepo } from 'src/common/utils/base.repo';
import { Problem, ProblemDocument } from '../schemas/problems.schema';

export class ProblemsRepo extends BaseRepo<Problem> {
  constructor(
    @InjectModel(DatabaseModelNames.PROBLEM_MODEL)
    private _ProblemsModel: Model<ProblemDocument>,
  ) {
    super(_ProblemsModel);
  }
}
