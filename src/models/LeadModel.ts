const mongoose = require("mongoose");
const validator = require("validator");

const LeadSchema = mongoose.Schema({
  name: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
  photoLead: { type: String, required: false },
  typeLead: { type: String, required: true },
  category: { type: String, required: true },
  serviceOrProduct: { type: String, required: true },
  uf: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true },
  colaborator: { type: String, required: true },
});
const LeadModel = mongoose.model("Leads", LeadSchema);

class Leads {
  private body: any;
  public errors: Array<string>;
  public lead: any;
  private session: any;
  constructor(body: any, session: any) {
    this.body = body;
    this.errors = [];
    this.lead = null;
    this.session = session;
  }
  public async createLead(): Promise<any> {
    try {
      if (!validator.isEmail(this.body.email))
        this.errors.push("Email Inválido !");
      this.lead = await LeadModel.create(this.body);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async edit(id: string): Promise<any> {
    this.lead = await LeadModel.findByIdAndUpdate(id, this.body, { new: true });
  }
  public async getAllNumberOfLeadsRegisterForUser(): Promise<any> {
    try {
      let leads = await LeadModel.find({ colaborator: this.session.nome });
      return leads.length;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getAllEmails(): Promise<any> {
    try {
      const leads = await LeadModel.find({ colaborator: this.session.nome });
      let emails = leads.filter((lead: any) => {
        if (validator.isEmail(lead.email)) return lead.email;
      });
      return emails.length;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getAllLeadsInThisMonth(): Promise<any> {
    const leads = await LeadModel.find({ colaborator: this.session.nome });
    const dateOfSoftware = new Date();
    const actualMonth = dateOfSoftware.getMonth();
    const leadsRegisterInThiseMonth = leads.filter((lead: any) => {
      let LeadDate = new Date(lead.date);
      if (actualMonth == LeadDate.getMonth()) {
        return lead.date;
      }
    });
    return leadsRegisterInThiseMonth.length;
  }
  public async getLeads(): Promise<any> {
    try {
      const leads = await LeadModel.find();
      return leads;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getLeadsById(id: string): Promise<any> {
    const lead = await LeadModel.findById(id);
    return lead;
  }
  public async deleteLead(id: string): Promise<any> {
    const deleted = await LeadModel.findByIdAndDelete({ _id: id });
    return deleted;
  }
  public async getLeadsRegisterToday(): Promise<number> {
    try {
      const leadsOfUser = await LeadModel.find({
        colaborator: this.session.nome,
      });
      let myDate = new Date();
      let formated = this.dateFormatter(myDate);
      console.log(formated);
      let filtredLead = leadsOfUser.filter((lead: any) => {
        let formatedDate = this.dateFormatter(lead.date);
        console.log(formatedDate);
        if (formated === formatedDate) return lead;
      });
      return filtredLead.length;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  private dateFormatter(date: Date): string {
    let defaultDate = new Date(date);
    let day =
      defaultDate.getDate() < 10
        ? `0${defaultDate.getDate()}`
        : defaultDate.getDate();
    let month =
      defaultDate.getMonth() < 10
        ? `0${defaultDate.getMonth()}`
        : defaultDate.getMonth();
    let year = defaultDate.getFullYear();
    let formatedDate = `${day}-${month}-${year}`;
    return formatedDate;
  }
  public async getLeadsOfUser(): Promise<any> {
    try {
      const leadsOfUser = await LeadModel.find({
        colaborator: this.session.nome,
      });
      return leadsOfUser;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

exports.Leads = Leads;
