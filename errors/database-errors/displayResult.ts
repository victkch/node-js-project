class DisplayResult {
  public displayResult(
    res: any,
    status: number,
    message: string,
    results?: any
  ): any {
    switch (status) {
      case 200:
        return res.status(200).json({
          success: true,
          message: message,
          results: results,
        });
      case 404:
        return res.status(404).json({
          success: false,
          message: message,
        });
    }
  }
}

export { DisplayResult };
