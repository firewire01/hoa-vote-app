import { FileDTO } from "./file-dto";

export class CandidateDto {
    id: number;
    fname: string;
    lname: string;
    blk: number;
    lot: number;
    migs: boolean;
    email: string;
    violation: boolean;
    siblings: number;
    yearsInMarried: number;
    yearsInHoa: number;
    facebook: string;
    linkedin: string;
    candidateType: string;
    contactNumber: string;
    goals: Activities[];
    relevantActivities: Activities[];
    introStatements: Activities[];
    fileDTO: FileDTO;
    mname: string;
    industry: string;
    incumbent: boolean;
    currentJob: string;
    lastPosition: string;
    age: number;
    file64: string;
    canidateVote: number;
    percentile: number;
    color: string;

    constructor(
        id: number,
        fname: string,
        lname: string,
        age: number,
        blk: number,
        lot: number,
        migs: boolean,
        email: string,
        violation: boolean,
        siblings: number,
        yearsInMarried: number,
        yearsInHoa: number,
        canidateVote: number,
        percentile: number,
        facebook: string,
        linkedin: string,
        candidateType: string,
        contactNumber: string,
        goals: Activities[],
        relevantActivities: Activities[],
        introStatements: Activities[],
        fileDTO: FileDTO,
        mname: string,
        industry: string,
        currentJob: string,
        lastPosition: string,
        file64: string,
        incumbent: boolean,
        color: string,
    ) {
        this.id = id
        this.fname = fname
        this.lname = lname
        this.age = age
        this.blk = blk
        this.lot = lot
        this.migs = migs
        this.email = email
        this.violation = violation
        this.siblings = siblings
        this.yearsInMarried = yearsInMarried
        this.yearsInHoa = yearsInHoa
        this.facebook = facebook
        this.linkedin = linkedin
        this.candidateType = candidateType
        this.contactNumber = contactNumber
        this.goals = goals
        this.relevantActivities = relevantActivities
        this.introStatements = introStatements
        this.fileDTO = fileDTO
        this.mname = mname
        this.incumbent = incumbent
        this.industry = industry
        this.lastPosition = lastPosition
        this.currentJob = currentJob
        this.file64 = file64
        this.canidateVote = canidateVote
        this.percentile = percentile
        this.color = color
    }


}


export class Activities {
    id: number;
    description: string;
    candidateId: number;

    constructor(id: number, description: string, candidateId: number) {
        this.id = id
        this.description = description
        this.candidateId = candidateId
    }
}
